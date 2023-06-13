<?php

namespace App\Http\Controllers;

use Aws\S3\S3Client;

use App\Models\Attachment;
use Illuminate\Http\Request;

class AttachmentController extends Controller
{
    public function index()
    {
        return Attachment::all();
    }

    public function store(Request $request)
    {
        $body = $request->input();
        
        $s3Client = new S3Client([
            'version' => 'latest',
            'region'  => 'ncp-th',
            'endpoint' => getenv('NIPA_S3_ENDPOINT'),
            'use_path_style_endpoint' => false,
            'credentials' => [
                'key'    => getenv('NIPA_S3_ACCESS_KEY'),
                'secret' => getenv('NIPA_S3_SECRET_KEY'),
            ]
        ]);

        $putObjectParams = [
            'Bucket' => getenv('NIPA_S3_BUCKET_NAME'),
            'Key' => getenv('NIPA_S3_BASE_UPLOAD_PATH')."/".$body['key'],
            'ContentType' => $body['mime_type']
        ];

        $cmd = $s3Client->getCommand('PutObject', $putObjectParams);
        $presigned = $s3Client->createPresignedRequest($cmd, "+20 minutes")->withMethod("PUT");

        $body['status'] = "pending";
        $attachment = new Attachment($body);
        $attachment->save();
        $response = $attachment->toArray();
        $response['presigned_url'] = $presigned->getUri();
        return $response;
    }

    public function show(string $id)
    {
        return Attachment::find($id);
    }

    public function update(Request $request, string $id)
    {
        $attachment = Attachment::find($id);
        $body = $request->input(); 
        $attachment['status'] = $body['status'];
        $attachment->save();
        return $attachment;
    }

    public function destroy(string $id)
    {
        return Attachment::destroy($id);
    }
}
